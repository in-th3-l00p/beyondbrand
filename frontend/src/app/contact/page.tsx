'use client'
import * as Icon from 'react-feather';
import ContactForm from "@/app/contact/components/form";

export default function Page() {
 return (
     <section className={"responsive-px py-32 min-h-screen"}>
         <div className={"flex flex-col md:flex-row gap-8"}>
             <div className={"w-full md:w-1/2 flex flex-col justify-between"}>
                 <h1 className="font-bold text-left text-6xl mb-16 ">Contact us</h1>
                 <p className={"w-2/3 text-2xl 2xl:text-4xl mb-8"}>
                     For questions, technical assistance, or collaboration opportunities via the contact information
                     below or trough the form.
                 </p>
                 <div className={"flex flex-col gap-4"}>
                     <div className={"flex items-center"}>
                             <Icon.Phone/>
                         <p className={"ml-4"}>Phone: +40 765 597 608</p>
                     </div>
                     <div className={"flex items-center"}>
                             <Icon.Mail/>
                         <p className={"ml-4"}>beyondbrand@gmail.com</p>
                     </div>
                 </div>
             </div>
             <ContactForm/>
         </div>
     </section>
 )
}