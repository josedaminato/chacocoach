import { sanityClient } from "@/sanity/lib/client";
import type { Post } from "./types";
import {
  mockTrainer,
  mockPlans,
  mockTestimonials,
  mockTransformations,
  mockPosts,
  mockServices,
} from "./mockData";
import {
  trainerQuery,
  plansQuery,
  testimonialsQuery,
  transformationsQuery,
  postsQuery,
  postBySlugQuery,
  servicesQuery,
  settingsQuery,
} from "./sanity-queries";

const USE_MOCK =
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id";

async function fetchOrMock<T>(query: string, mock: T): Promise<T> {
  if (USE_MOCK) return mock;
  try {
    const data = await sanityClient.fetch(query);
    return (data ?? mock) as T;
  } catch {
    return mock;
  }
}

export async function getTrainer() {
  return fetchOrMock(trainerQuery, mockTrainer);
}

export async function getPlans(): Promise<import("./types").Plan[]> {
  return fetchOrMock(plansQuery, mockPlans);
}

export async function getTestimonials() {
  return fetchOrMock(testimonialsQuery, mockTestimonials);
}

export async function getTransformations() {
  return fetchOrMock(transformationsQuery, mockTransformations);
}

export async function getPosts(): Promise<Post[]> {
  return fetchOrMock(postsQuery, mockPosts);
}

export async function getPostBySlug(slug: string) {
  if (USE_MOCK) {
    const post = mockPosts.find((p) => p.slug === slug);
    return post ?? null;
  }
  try {
    return await sanityClient.fetch(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function getServices() {
  if (USE_MOCK) return mockServices.services;
  try {
    const services = await sanityClient.fetch(servicesQuery);
    return services || mockServices.services;
  } catch {
    return mockServices.services;
  }
}

export async function getHowItWorks() {
  if (USE_MOCK) return mockServices.howItWorks;
  try {
    const settings = await sanityClient.fetch(settingsQuery);
    return settings?.howItWorks || mockServices.howItWorks;
  } catch {
    return mockServices.howItWorks;
  }
}
