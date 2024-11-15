'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { 
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModel from '@/app/hooks/useRegisterModel';
import Model from './Model';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModel = () => {
    const registerModel = useRegisterModel();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors, 
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/auth/register', data)
        .then(() => {
            registerModel.onClose();
        })
        .catch((error) => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
           <Heading 
            title='Welcome to Airbnb'
            subtitle='Create an account!'
           />
           <Input
           id="Email"
           label='Email'
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
           <Input
           id="Name"
           label='Name'
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
           <Input
           id="password"
           type='password'
           label='Password'
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
              outline
              label='Continue with Google'
              icon={FcGoogle}
              onClick={() => {}}
            />
            <Button 
              outline
              label='Continue with Github'
              icon={AiFillGithub}
              onClick={() => {}}
            />
            <div 
              className='
                text-neutral-500
                text-center
                mt-4
                font-light
            '
            >
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                    Already have an account?
                    </div>
                    <div
                       onClick={registerModel.onClose}
                       className='
                       text-neutral-800
                       cursor-pointer
                       hoover:underline
                       '
                    >
                    log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Model
          disabled={isLoading}
          isOpen={registerModel.isOpen}
          title='Register'
          actionLabel='Continue'
          onClose={registerModel.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
    )
}

export default RegisterModel;