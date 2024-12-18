// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";

const functionName = "hello-world";
const app = new Hono().basePath(`/${functionName}`);

const fetchToGov = async (startIdx: string, endIdx: string) => {
  const baseUrl = "https://foodsafetykorea.go.kr/api";
  const keyId = "6c90c288cab14cfda622";
  const serviceId = "I0470";
  const dataType = "json";
  const url = new URL(
    `${baseUrl}/${keyId}/${serviceId}/${dataType}/${startIdx}/${endIdx}`,
    baseUrl
  );

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
};

app.get("/", async (c) => {
  try {
    const { startIdx, endIdx } = c.req.query();
    const data = await fetchToGov(startIdx, endIdx);
    return new Response(data);
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
});

Deno.serve(app.fetch);
