export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <div className="w-full border rounded-md p-3">{id}</div>;
}
