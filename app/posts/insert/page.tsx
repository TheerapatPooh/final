'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { Post } from '../page'

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title must be required"
    }),
    body: z.string().min(1, {
        message: "Body must be required"
    }).email({
        message: "Invalid Email"
    }).max(15, {
        message: "Character max length 15"
    })
})

export default function page() {
    async function createPost(post: Post) {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts',post)
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createPost(values)
    }

    return (
        <div className='p-5'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="post title" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Body</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="post body" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
