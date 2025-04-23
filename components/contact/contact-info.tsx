import { SnsLinks } from '@/components/sns-links'

export function ContactInfo() {
  return (
    <div className="lg:pl-12 lg:border-l lg:border-white/10">
      <p className="text-gray-300 mb-8">
        Feel free to connect through social media or drop me an email directly.
      </p>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Email</h4>
          <a 
            href="mailto:hk.kasshii@gmail.com" 
            className="text-lg text-[#F2C1D1] hover:underline focus:outline-none focus:ring-2 focus:ring-[#F2C1D1]/50 inline-block"
          >
            hk.kasshii@gmail.com
          </a>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Location</h4>
          <p className="text-lg">Tokyo, Japan</p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Social</h4>
          <div className="flex space-x-4">
            <SnsLinks />
          </div>
        </div>
      </div>
    </div>
  )
} 