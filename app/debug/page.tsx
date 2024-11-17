'use client'

import { useTheme } from '@/components/ThemeProvider'
import { MHCard } from '@/components/MHCard/MHCard'
import { EquipmentBox } from '@/components/EquipmentBox/EquipmentBox'

export default function DebugPage() {
  const { theme } = useTheme()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Debug Page - Current Theme: {theme}</h1>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Text Styles</h2>
        <div className="space-y-4 p-6 bg-secondary rounded-lg">
          <div>
            <h3 className="text-sm text-secondary mb-2">Main Text (mh-text-main)</h3>
            <p className="mh-text-main">This is the main text style with pale yellow color</p>
          </div>

          <div>
            <h3 className="text-sm text-secondary mb-2">Highlight Text (mh-text-highlight)</h3>
            <p className="mh-text-highlight">This is highlighted text with brighter yellow</p>
          </div>

          <div>
            <h3 className="text-sm text-secondary mb-2">Info Text (mh-text-info)</h3>
            <p className="mh-text-info">This is info text with blue-ish color</p>
          </div>

          <div>
            <h3 className="text-sm text-secondary mb-2">White Text (mh-text-white)</h3>
            <p className="mh-text-white">This is white text with normal weight</p>
          </div>

          <div>
            <h3 className="text-sm text-secondary mb-2">Gray Text (mh-text-gray)</h3>
            <p className="mh-text-gray">This is gray text with reduced opacity</p>
          </div>

          <div>
            <h3 className="text-sm text-secondary mb-2">Numeric Values</h3>
            <p>
              <span className="mh-text-negative mr-4">-25 Attack</span>
              <span className="mh-text-positive">+15 Defense</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Yellow Pale', class: 'bg-mh-yellow-pale' },
            { name: 'Yellow', class: 'bg-mh-yellow' },
            { name: 'Blue Light', class: 'bg-mh-blue-light' },
            { name: 'White', class: 'bg-mh-white' },
            { name: 'Gray', class: 'bg-mh-gray' },
            { name: 'Red', class: 'bg-mh-red' },
            { name: 'Green', class: 'bg-mh-green' },
            { name: 'Background', class: 'bg-primary' },
          ].map((color) => (
            <div
              key={color.name}
              className="p-4 rounded-lg text-center"
            >
              <div className={`${color.class} h-16 rounded-md mb-2 border border-gray-600`}></div>
              <span className="text-sm">{color.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Typography Scale</h2>
        <div className="space-y-4 p-6 bg-secondary rounded-lg">
          {[
            { size: 'text-4xl', label: '4XL' },
            { size: 'text-3xl', label: '3XL' },
            { size: 'text-2xl', label: '2XL' },
            { size: 'text-xl', label: 'XL' },
            { size: 'text-lg', label: 'LG' },
            { size: 'text-base', label: 'Base' },
            { size: 'text-sm', label: 'SM' },
            { size: 'text-xs', label: 'XS' },
          ].map((size) => (
            <div key={size.label} className="flex items-center">
              <span className="w-20 text-sm text-secondary">{size.label}</span>
              <p className={`${size.size} mh-text-main`}>
                Monster Hunter Text Example
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Component Examples</h2>
        <div className="space-y-6 p-6 bg-secondary rounded-lg">
          {/* Add your component examples here */}
          <div>
            <h3 className="text-sm text-secondary mb-2">Button Examples</h3>
            <div className="space-x-4">
              <button className="px-4 py-2 bg-mh-yellow-pale text-black rounded">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-mh-gray text-black rounded">
                Secondary Button
              </button>
            </div>
          </div>
          
          {/* Add more component examples as we create them */}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">MHCard Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main variant */}
          <MHCard title="Main Title Card" titleVariant="main">
            <p className="mh-text-white">
              This is a card with the main title style. The content can be anything you want.
            </p>
          </MHCard>

          {/* Highlight variant */}
          <MHCard title="Highlighted Card" titleVariant="highlight">
            <div className="space-y-2">
              <p className="mh-text-info">Some info text here</p>
              <p className="mh-text-gray">Additional details in gray</p>
            </div>
          </MHCard>

          {/* Info variant */}
          <MHCard title="Information Card" titleVariant="info">
            <div className="flex justify-between">
              <span className="mh-text-white">Attack:</span>
              <span className="mh-text-positive">+25</span>
            </div>
          </MHCard>

          {/* White variant */}
          <MHCard title="Stats Overview" titleVariant="white">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="mh-text-gray">Defense:</span>
                <span className="mh-text-main">150</span>
              </div>
              <div className="flex justify-between">
                <span className="mh-text-gray">Resistance:</span>
                <span className="mh-text-negative">-10</span>
              </div>
            </div>
          </MHCard>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">MHCard Title Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Simple string title */}
          <MHCard 
            title="Basic String Title" 
            titleVariant="main"
          >
            <p className="mh-text-white">Basic card with string title</p>
          </MHCard>

          {/* Complex title with icon */}
          <MHCard 
            title={
              <div className="flex items-center gap-2">
                <span>⚔️</span>
                <span>Weapon Details</span>
              </div>
            } 
            titleVariant="highlight"
          >
            <p className="mh-text-white">Card with icon in title</p>
          </MHCard>

          {/* Title with multiple styles */}
          <MHCard 
            title={
              <div className="flex items-center gap-2">
                <span className="mh-text-highlight">Rathalos</span>
                <span className="mh-text-gray">- Flying Wyvern</span>
              </div>
            } 
            titleVariant="main"
          >
            <p className="mh-text-white">Card with mixed title styles</p>
          </MHCard>

          {/* Title with custom component */}
          <MHCard 
            title={
              <div className="flex justify-between items-center">
                <span>Rarity 8 Weapon</span>
                <div className="flex gap-1">
                  {[1,2,3].map(star => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            } 
            titleVariant="info"
          >
            <p className="mh-text-white">Card with complex title layout</p>
          </MHCard>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Background Pattern Examples</h2>
        
        {/* Page Pattern */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm text-secondary mb-2">Page Background Pattern</h3>
          <div className="mh-background-pattern h-64 rounded-lg border border-gray-600">
            <div className="p-4">
              <span className="mh-text-main">Default page background pattern</span>
            </div>
          </div>
        </div>

        {/* Component Pattern */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm text-secondary mb-2">Component Pattern (Diagonal)</h3>
          <div className="mh-component-pattern h-64 rounded-lg border border-gray-600">
            <div className="p-4">
              <span className="mh-text-main">Component-specific pattern</span>
            </div>
          </div>
        </div>

        {/* Alternative Component Pattern */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm text-secondary mb-2">Component Pattern (Dots)</h3>
          <div className="mh-component-pattern-dots h-64 rounded-lg border border-gray-600">
            <div className="p-4">
              <span className="mh-text-main">Alternative component pattern</span>
            </div>
          </div>
        </div>

        {/* Pattern with Card */}
        <div className="space-y-4">
          <h3 className="text-sm text-secondary mb-2">Pattern with Card Overlay</h3>
          <div className="mh-component-pattern h-64 rounded-lg border border-gray-600 p-4">
            <MHCard title="Card Over Pattern" titleVariant="highlight">
              {/* Equipment Box */}
              <p className="mh-text-white">Equipment Box Example</p>
              <EquipmentBox imageUrl="icons/lance.svg"
                rarity={1}
                key="lance"
              />
            </MHCard>
          </div>
        </div>
      </section>
    </div>
  )
}
