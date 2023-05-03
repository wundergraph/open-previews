import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body?.email || body?.formId !== "early-access-form") {
      return new Response("Invalid params", { status: 400 });
    }

    const result = await api("/contacts", {
      contact: {
        email: body.email,
      },
    });

    if (result?.status !== 200) {
      return new Response("Sign up failed", { status: result?.status });
    }

    const data = await result.json();

    let contact = data?.contact;

    if (data.errors?.[0]?.code === "duplicate") {
      const result = await api("/contact/sync", {
        contact: {
          email: body.email,
        },
      });

      if (result?.status !== 200) {
        return new Response("Sync failed", { status: result?.status });
      }

      const data = await result.json();

      contact = data?.contact;
    }

    if (contact?.id) {
      await api("/contactLists", {
        contactList: {
          list: parseInt(import.meta.env.AC_LIST_ID || "21"),
          contact: contact.id,
          status: 1,
        },
      });
    } else {
      return new Response(null, { status: 400 });
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
