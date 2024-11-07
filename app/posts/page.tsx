'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export interface Post {
    userId?: number
    id?: number
    title: string
    body: string
}

export default function page() {
    const [post, setPost] = useState<Post[]>([])
    const router = useRouter()
    async function getPost() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
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
    }, [])

    console.log(post)
    return (
        <div className='p-5'>
            <Button className='mb-5' onClick={() => router.push('http://localhost:3000/posts/insert')}>
                New Post
            </Button>
            <div className='grid grid-cols-3 gap-5'>
                {post.map((post) => (
                    <Card key={post.id} className='flex flex-col justify-between '>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{post.body}</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push(`http://localhost:3000/posts/${post.id}`)}>Detail</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
