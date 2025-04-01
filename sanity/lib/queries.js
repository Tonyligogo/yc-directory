import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
    `*[_type == 'startup' && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author->{
    _id,
        name,
        image,
        bio
    },
    views,
    description,
    category,
    image
    }`
)

export const SIGNLE_STARTUP_FETCH = defineQuery(
    `*[_type == 'startup' && _id == $id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author->{
    _id,
        name,
        image,
        bio,
        username
    },
    views,
    description,
    category,
    image, 
    pitch
    }`
)

export const STARTUP_VIEWS_FETCH = defineQuery(
    `*[_type == 'startup' && _id == $id][0]{
        _id,
        views
    }`
)

export const AUTHOR_FETCH = defineQuery(
    `*[_type == 'author' && id == $id][0]{
        _id,
        id,
        name,
        image,
        email,
        bio,
        username
    }`
)

export const AUTHOR_FETCH_BY_ID = defineQuery(
    `*[_type == 'author' && _id == $id][0]{
        _id,
        id,
        name,
        image,
        email,
        bio,
        username
    }`
)

export const USER_STARTUPS_FETCH = defineQuery(
    `*[_type == 'startup' && author._ref == $id] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author->{
    _id,
        name,
        image,
        bio,
    },
    views,
    description,
    category,
    image, 
    }`
)

export const CATEGORIES_BY_SLUG_FETCH = defineQuery(
    `*[_type == 'category' && slug.current == $slug][0]{
    _id,
    title,
    slug,
    select[]->{
        _id,
        _createdAt,
        title,
        slug,
        author->{
            _id,
            name,
            image,
            bio,
            slug
        },
        views,
        description,
        category,
        image, 
        pitch
    }
    }`
)