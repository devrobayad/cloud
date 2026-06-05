import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set up Express to parse incoming JSON and urlencoded requests with generous limits
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Dynamic API route handler mimicking save-data.php
  app.all("/api/save-data.php", (req, res) => {
    const dataFile = path.join(process.cwd(), "public", "site_data.json");

    if (req.method === "POST") {
      try {
        const payload = req.body;
        if (!payload || Object.keys(payload).length === 0) {
          return res.status(400).json({
            status: "error",
            message: "Empty payload received by API gateway server."
          });
        }

        // Write the incoming CMS configurations to site_data.json permanently
        fs.writeFileSync(dataFile, JSON.stringify(payload, null, 2), "utf-8");
        console.log("Successfully persisted updated dataset in /public/site_data.json");
        
        return res.json({
          status: "success",
          message: "All settings and configurations have been successfully saved permanently in cPanel site_data.json file!"
        });
      } catch (err: any) {
        console.error("Failed to write dynamic site configurations:", err.message);
        return res.status(500).json({
          status: "error",
          message: `Internal Server Error saving configurations: ${err.message}`
        });
      }
    } else if (req.method === "GET") {
      try {
        if (!fs.existsSync(dataFile)) {
          return res.json({
            status: "success",
            data: {}
          });
        }
        const fileContent = fs.readFileSync(dataFile, "utf-8");
        let parsed = {};
        try {
          parsed = JSON.parse(fileContent);
        } catch {
          parsed = {};
        }
        return res.json({
          status: "success",
          data: parsed
        });
      } catch (err: any) {
        console.error("Failed to read dynamic site configurations:", err.message);
        return res.status(500).json({
          status: "error",
          message: `Internal Server Error reading configurations: ${err.message}`
        });
      }
    } else {
      return res.status(405).json({
        status: "error",
        message: "Method Not Allowed"
      });
    }
  });

  // Handle Vite middleware to run full SPA alongside dynamic API routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html as a fallback for the SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development backend server listening dynamically on http://localhost:${PORT}`);
  });
}

startServer();
