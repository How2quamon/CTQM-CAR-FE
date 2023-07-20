
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
interface VMLogin {
    Email: string;
    Password: string;
    KeepLogedIn: boolean;
    NewEmail: string;
    NewPassword: string;
    NewName: string;
    NewPhone: string;
}

export default function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const InputType = (props: { inputName: any; inputTypes: any; descriptionInput: any; onChangHandler: any; onBlurHandler: any; iconName: any; }) => {

        const { inputName, inputTypes, descriptionInput, onChangHandler, onBlurHandler, iconName } = props;
    }

    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);

    };

    return (
        <Link to={''}>
            <div className='flex justify-center items-center h-screen bg-slate-200 '  >
                <div id="form" className='block bg-slate-50 p-6 rounded-xl shodow-md shadow-slate-300 w-[450px]'>
                    <form action=''>
                        <h2 className='text-black text-3xl font-semibold my-4'>Register</h2>
                        <div id='fullName' className="flex flex-row">
                            <div id='firstName' className='w-1/2 mr-1'>
                                <label htmlFor='fname' className='text-sm'>First Name</label>
                                <input type='text' name='' id='fname' className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-black shadow-sm'></input>
                            </div>
                            <div id='lastName' className='w-1/2 mr-1'>
                                <label htmlFor='fname' className='text-sm'>Last Name</label>
                                <input type='text' name='' id='lname' className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-black shadow-sm'></input>
                            </div>
                        </div>
                        <label htmlFor='email' className='text-sm'>Email</label>
                        <input type='email' name='' id='email' className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-black shadow-sm'></input>

                        <label htmlFor='Identification' className='text-sm'>Identification</label>
                        <input type='text' name='' id='Identification' className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-black shadow-sm'></input>

                        <label htmlFor='password' className='text-sm'>Password</label>
                        <input type='password' name='' id='Password' className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-black shadow-sm'></input>

                        <label htmlFor='confirmPassword' className='text-sm'>Confirmpassword</label>
                        <input type='password' name='' id='confirmPassword' className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-black shadow-sm'></input>

                        <div id='gender' className='text-sm mb-2'>
                            <p className='mt-2'>Gender</p>
                            <input type='radio' name='gender' id='male' className='text-sm mx-1' checked /><label htmlFor="'male">Male</label>
                            <input type='radio' name='gender' id='female' className='text-sm mx-1' checked /><label htmlFor="'female">Female</label>
                            <input type='radio' name='gender' id='other' className='text-sm mx-1' checked /><label htmlFor="'other">Other</label>
                        </div>
                        <input type='submit' name='' id='signUp' className='bg-slate-900 w-full h-10 text-white cursor-pointer rounded-md hover:bg-slate-900 hover:outline outline-2 outline-black outline-offset-2 text-sm'></input>
                        <p className="text-xs my-2"> Already have an account?<Link to ={'/login'} className='text-blue-500'>Login</Link></p>
                    </form>
                </div>
            </div>
        </Link>
    );
};
