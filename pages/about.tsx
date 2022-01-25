import type { NextPage } from 'next'
import {useRouter} from "next/router";
import {useEffect} from "react";

export interface AboutPropInterface {}

const About: NextPage = (props: AboutPropInterface) => {
  const { query } = useRouter();

  // useEffect(() => {
  //   // if use useEffect and have param, component pre-rendering 2 times
  //   console.log(query?.userId)
  //   console.log(query?.ref)
  //   console.log(query?.old)
  // }, [query]);

  console.log('about query', query);
  return (
    <div>
      About page nhesssss2222
    </div>
  )
}
//
// export async function getServerSideProps() {
//   // if use getServerSideProps and have param, component rendering 1 time
//   // file này trong .next/server/pages sẽ là 1 file js và nó sẽ client sẽ phải download file js này về để thực thi
//   return {
//     props: {}
//   }
// }

export default About
