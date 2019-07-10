import { withData } from "next-apollo";
import { HttpLink } from "apollo-link-http";

console.log(process.env)
// can also be a function that accepts a `context` object (SSR only) and returns a config
const config = {
  link: new HttpLink({
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    uri: "https://sync-battle-llw1jgd5b.now.sh/graphql" // Server URL
  })
};

export default withData(config);
