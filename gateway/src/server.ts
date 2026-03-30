import { createApp } from "./app.js";
import { config } from "./config.js";

const app = createApp();

app.listen(config.port, () => {
  console.log(`[gateway] Frontier Marketing OS Gateway running on port ${config.port}`);
});
