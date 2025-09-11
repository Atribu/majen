import React from 'react'
import InfoSection from '../components/homepage/InfoSection'
import HighlightSection from '../components/homepage/HighlightSection'
import ContactFrom from '../components/generalcomponent/ContactFrom'
import BackgroundSection from '../components/homepage/BackgroundSection2'
import CollectionsSection from '../components/homepage/CollectionsSection'

const page = () => {
  return (
    <div>
        <InfoSection />
        <HighlightSection />
        <ContactFrom />
        <CollectionsSection />
        <BackgroundSection />
    </div>
  )
}

export default page