'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import axios from 'axios'


const Page = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        })
    }, []);

    const { toast } = useToast();
    const sendDataToDatabase = async (formData) => {
        try {
            await axios.post('/api/users/sign-up', {
                username: formData.username,
                workEmail: formData.workEmail,
                password: formData.password
            })
        } catch (error) {
            toast({
                description: error.message,
            });
        }
    }
    const formSchema = z.object({
        username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
        workEmail: z.string().email(),
        password: z.string().min(5, { message: 'Password must be at least 5 characters' }),
        agreeToTerms: z.boolean(),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ["confirmPassword"]
    }, (data) => data.agreeToTerms === true, {
        message: 'You must agree to the terms and conditions',
        path: ["agreeToTerms"]
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            workEmail: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        }
    });
    function onSubmit() {
        console.log('ONSUBMIT FUNCTION CALLED');
    }
   
    return (
        <div className="h-[100vh]" data-aos="fade-up">
            <div className="flex  items-center justify-center h-[100%]">
                <div className="w-[25%]">
                    <h1 className="text-5xl font-bold text-center mb-5">assessify.</h1>
                    <p className='text-center mb-4 text-sm'>Create an Assessify account today and unlock a world of talent assessment possibilities!</p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="workEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Work Email" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Confirm Password" type="password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="agreeToTerms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='flex align-items-center space-x-2'>
                                                <Checkbox id="terms" {...field} />
                                                <Label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    name="conditionTerms"
                                                >
                                                    Accept terms and conditions
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




                            <Button className="mt-5 text-1xl w-[100%] mx-auto"  type="submit" onClick={() => {

                                sendDataToDatabase(form.getValues());
                            }}>Sign Up</Button>

                        </form>
                        <div className="flex justify-center mt-5">
                            <Link href="/sign-in" className="text-center font-semibold ">Already have an account?</Link>

                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Page
