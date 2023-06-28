export const cleanCommentText = (text: string) => {
  const chunks = text.split(/\n{2,}/) ?? [];

  if (chunks.length > 1) chunks.pop();

  return chunks.join("\n\n");
};
