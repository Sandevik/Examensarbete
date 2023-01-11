import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from '../components/PaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY : "")

export default function account() {
  return (
    <div>
        

        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    </div>
  )
}
