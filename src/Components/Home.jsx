
import { Helmet } from "react-helmet";
import FeaturedProduct from "./FeaturedProduct";
export default function Home() {
  return<>
  <Helmet>
  <meta charSet="utf-8" />
    <title>   Home</title>
  </Helmet>
 <FeaturedProduct/>
  </>
}
