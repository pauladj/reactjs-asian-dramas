import { useRouter } from "next/router";

const TVShowPage = ({ data }) => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <p>Post: {pid}</p>
    </>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  const data = [];
  // Pass data to the page via props
  return { props: { data } };
}

export default TVShowPage;
