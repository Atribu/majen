import React from 'react'
import IntroSection from '../components/products1/IntroSection';
import VariantCircleSection from '../components/products1/VariantCircleSection';
import ContactFrom from '../components/generalcomponent/ContactFrom';
import BackgroundSection from '../components/homepage/BackgroundSection';

const page = () => {
  return (
    <div>
        <IntroSection />
        <ContactFrom />
        <div className='mt-12 mb-32'>
        <BackgroundSection/>
        </div>

    </div>
  )
}

export default page