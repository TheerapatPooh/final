'use client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Post } from '../page'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function page() {
    const { id } = useParams()
    const [post, setPost] = useState<Post>()
    const router = useRouter()
    async function getPost() {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    async function deletePost() {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            router.push('http://localhost:3000/posts')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const posts = await getPost()
            setPost(posts)
        }
        fetchData()
    }, [id])

    if (!post) {
        return (
            <p>Loading...</p>
        )

    }
    console.log(id)
    return (
        <div className='p-5'>
            <Card>
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{post.body}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => deletePost()}>Delete</Button>
                </CardFooter>
            </Card >
        </div >
    )
}
