import type { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { API_BASE, RESULTS_BUCKET } from "./utilities/constants";

export default {
  config(_input) {
    return {
      name: "platform",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(function frontend({ stack }) {
      const site = new NextjsSite(stack, "frontend", {
        // TODO: Look into setting up externally hosted domain association
        // customDomain: app.stage === "prod" ? "platform.deaglo.com" : undefined,
        environment: {
          API_BASE,
          RESULTS_BUCKET,
        },
        permissions: ["s3:GetObject"],
      });
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
