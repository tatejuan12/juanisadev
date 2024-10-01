// import axios from 'axios';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    let data;
    try {
        data = await request.json();
        console.log(data)
    }
    catch (e) {
        return NextResponse.json({status: 'error', message: 'Invalid JSON'})
    }
    if (data.hasOwnProperty("prompt")) {
        if (data.prompt == "wow") throw Error;
        await new Promise(resolve => setTimeout(resolve, 3000));
        return NextResponse.json({status: 'success', data: {prompt: "Sure! Here's a concise way to communicate your value as a developer to potential employers:\n" +
                    "\n" +
                    "---\n" +
                    "\n" +
                    "**Subject: Helping Your Business Thrive Through Technology**\n" +
                    "\n" +
                    "Hi [Employer's Name],\n" +
                    "\n" +
                    "I’m Juan, a full-stack developer with a strong background in leading tech projects from inception to launch. My experience spans software development, system architecture, and leading technology teams, which means I can take an idea from the planning phase and transform it into a fully-functioning solution.\n" +
                    "\n" +
                    "Here’s how I can help your business:\n" +
                    "\n" +
                    "1. **Full-Stack Web Development**: I can build web applications from front-end to back-end, using technologies like Node.js, Express, MongoDB, and more. This allows me to handle your entire application lifecycle and solve issues across the stack.\n" +
                    "   \n" +
                    "2. **Cloud & API Development**: With hands-on experience in AWS, I’ve developed APIs, deployed serverless architectures, and built scalable backend systems, ensuring your business can grow without tech bottlenecks.\n" +
                    "\n" +
                    "3. **Innovative Problem Solving**: My experience developing complex algorithms like a driver matching system (similar to Uber, but for cooks!) demonstrates my ability to create custom solutions tailored to your needs.\n" +
                    "\n" +
                    "4. **Project Leadership**: As the former CTO of Cosmos Capital Management, I’ve led multiple tech projects, managed teams, and delivered results on time. This includes launching successful products like an NFT marketplace on the XRPL.\n" +
                    "\n" +
                    "I’m passionate about leveraging technology to make businesses more efficient and scalable. Let’s discuss how I can bring value to your team.\n" +
                    "\n" +
                    "Best regards,  \n" +
                    "Juan\n" +
                    "\n" +
                    "---\n" +
                    "\n" +
                    "Would you like to tweak or customize any part of this pitch?"} })
    }


    return NextResponse.json({status: 'ok'})
}