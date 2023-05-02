import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body?.email || body?.formId !== "early-access-form") {
      // Sends a HTTP bad request error code
      new Response(null, { status: 400 });
    }

    const result = await api("/contacts", {
      contact: {
        name: body.name,
        email: body.email,
      },
    });

    if (!result.ok) {
      new Response(null, { status: 400 });
    }

    const data = await result.json();

    if (data.errors?.[0]?.code === "duplicate") {
      return new Response(null, { status: 200 });
    } else if (data.contact?.id) {
      await api("/contactLists", {
        contactList: {
          list: parseInt(import.meta.env.AC_LIST_ID || "21"),
          contact: data.contact.id,
          status: 1,
        },
      });
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(null, { status: 500 });
  }
};

const api = (path: string, data: any) => {
  return fetch("https://wundergraph.api-us1.com/api/3" + path, {
    method: "POST",
    headers: {
      "Api-Token": import.meta.env.AC_API_TOKEN || "",
    },
    body: JSON.stringify(data),
  });
};
