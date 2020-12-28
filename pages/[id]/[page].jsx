import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { page } = router.query;

  console.log(page);

  return <div>Страница</div>;
}
