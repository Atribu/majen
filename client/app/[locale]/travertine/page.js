import React from 'react'
import InfoSection from '../components/homepage/InfoSection'
import HighlightSection from '../components/homepage/HighlightSection'
import BackgroundSection2 from '../components/homepage/BackgroundSection';
import ContactFrom from '../components/generalcomponent/ContactFrom'
import BackgroundSection from '../components/homepage/BackgroundSection2'
import CollectionsSection from '../components/homepage/CollectionsSection'

const page = () => {
  return (
    <div>
        <InfoSection />
        <div className='flex mb-48 -mt-20'>
            <BackgroundSection2 />
        </div>
        
        <HighlightSection />
        <ContactFrom />
        <CollectionsSection />
        <BackgroundSection />
    </div>
  )
}

export default page