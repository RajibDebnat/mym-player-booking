'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { BsTelephoneFill } from 'react-icons/bs'
import logo1 from '../public/logo1.webp';

import logo2 from '../public/logo2.webp';

const roles = [
  "Outside Hitter (Left-side Hitter)",
  "Opposite Hitter (Right-side Hitter)",
  "Middle Blocker (Middle Hitter)",
  "Setter",
  "Libero",
  "Defensive Specialist"
]

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    playerName: '',
    contactNumber: '',
    role: roles[0],
    dateOfJoining: new Date().toISOString().split('T')[0],
    gameName: 'Volleyball',
    clubName: 'MYM',
  })

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const formData = { ...form };
  
  try {
    const res = await fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
   
    setSubmitted(true); // optional: to disable button after submit
  } catch (err) {
    console.error('Error:', err);
    alert('Something went wrong');
  }
};


  return (
    <main className="min-h-screen overflow-y-clip   bg-transparent flex items-center justify-center p-6  text-white">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white  rounded-2xl shadow-2xl p-8 pt-10 max-w-xl w-full space-y-6"
      >
       <h1 className="text-3xl uppercase font-extrabold text-center text-[#0269a9] max-sm:text-xl flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
  {/* Logo 1 */}
  <div className="relative max-sm:w-14  max-sm:h-14 w-12 h-12  ">
    <Image
      src={logo1} // Replace with your actual logo path
      alt="Logo 1"
      fill
      className="object-contain"
    />
  </div>

  Secure Your Spot

  {/* Logo 2 */}
  <div className="relative max-sm:w-14  max-sm:h-14 w-12 h-12   ">
    <Image
      src={logo2} // Replace with your actual logo path
      alt="Logo 2"
      fill
      className="object-contain"
    />
  </div>
</h1>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="font-semibold text-black">Player Name</label>
            <input
              name="playerName"
              value={form.playerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border text-black  bg-white  border-[#0277ba] rounded-xl"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="font-semibold text-black">Contact Number</label>
            <input
              name="contactNumber"
              type="tel"
              value={form.contactNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border text-black bg-white border-[#0277ba] rounded-xl"
              placeholder="Enter contact"
            />
          </div>

          <div>
            <label className="font-semibold text-black">Select Role</label>
            <select
            title='Select Role'
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full  bg-white text-black px-4 py-2 border border-[#0277ba] rounded-xl"
            >
              {roles.map((role, idx) => (
                <option key={idx} className='text-black bg-transparent' value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-black">Date of Joining</label>
            <input
            title='Date of Joining'
              name="dateOfJoining"
              type="date"
              value={form.dateOfJoining}
              onChange={handleChange}
              className="w-full px-4 py-2  bg-white text-black border border-[#0277ba] rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 ">
            <div>
              <label className="font-semibold text-black">Game</label>
              <input
                title='Game'
                name="gameName"
                value={form.gameName}
                readOnly
                className="w-full px-4 py-2  bg-white text-black border border-[#0277ba] rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold  text-black  ">Club</label>
              <input
                title='Club'
                name="clubName"
                value={form.clubName}
                readOnly
                className="w-full px-4 py-2 bg-white text-black  border border-[#0277ba] rounded-xl"
              />
            </div>
          </div>
        </div>
{submitted ? (
 <div className=' flex justify-center items-center gap-4 flex-col'>

 <a
    href="https://chat.whatsapp.com/IpgglZSy6FE80nxib3mYTP"
    target="_blank"
    rel="noopener noreferrer"
    className=" flex justify-center flex-col items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition duration-300 text-center"
    >
  <span className=' text-2xl gap-4'><FaWhatsapp/></span> <span>Join MYM Group</span> 
  </a>
  <p className=' font-semibold max-sm:text-sm text-center text-lg text-green-500'>Form Submited Successfully</p>
    </div>
) : (
  <button
    type="submit"
    disabled={submitted}
    className={`w-full ${
      submitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#efe006] hover:bg-yellow-600 '
    } text-black cursor-pointer font-bold py-2 rounded-xl`}
  >
    Book Now
  </button>
)}
        <div className="pt-2 border-t mt-0 text-sm">
          <p className="font-semibold mb-2 text-black">Contact Support:</p>
          <div>
            <Link href="tel:+919735995321" className="text-black hover:underline flex gap-1" >
             <span className=' text-2xl '><BsTelephoneFill/> </span> <span className='text-lg font-semibold'>Vichar –  97359 95321</span>
            
            </Link>
            <br />
            <Link href="tel:+917551037762" className="text-black hover:underline flex gap-1">
              <span className=' text-2xl'><BsTelephoneFill/> </span > <span className=' text-lg font-semibold'> Lokesh – 75510 37762</span> 
            </Link>
          </div>
        </div>
       
      </form>
  <Image src="/bg.jpg" width={900} height={900} alt="volleyball   team registration image" className="absolute top-0 right-0 w-full -z-10 object-fill    h-[120vh] " />
  {/* <Image src="/logo2.png" width={150} height={150} alt="volleyball   team registration image" className="absolute   top-4 left-6   max-sm:hidden" /> */}
    
    </main>
  )
}
