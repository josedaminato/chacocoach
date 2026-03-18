export const trainerQuery = `*[_type == "trainer"][0]{
  name,
  bio,
  "photo": photo.asset->url,
  certifications,
  metrics
}`;

export const plansQuery = `*[_type == "plan" && isActive == true] | order(price asc){
  _id,
  name,
  price,
  billingPeriod,
  features,
  harbizUrl,
  isFeatured,
  quizScore
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc){
  _id,
  clientName,
  "clientPhoto": clientPhoto.asset->url,
  text,
  rating,
  videoUrl,
  discipline
}`;

export const transformationsQuery = `*[_type == "transformation"] | order(_createdAt desc){
  _id,
  clientName,
  "beforePhoto": beforePhoto.asset->url,
  "afterPhoto": afterPhoto.asset->url,
  duration,
  discipline
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  excerpt,
  category,
  publishedAt,
  seoDescription
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  "coverImage": coverImage.asset->url,
  excerpt,
  body,
  category,
  publishedAt,
  seoDescription
}`;

export const servicesQuery = `*[_type == "service"] | order(_createdAt asc){
  _id,
  title,
  description,
  icon
}`;

export const settingsQuery = `*[_type == "settings"][0]{
  howItWorks
}`;
