import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Clothing {
  name: string;
  unitPrice: number;
  darkUnitPrice: number;
  designElements: number;
}

interface Brand {
  [key: string]: {
    TShirt: Clothing;
    Crewneck: Clothing;
    Hoodie: Clothing | Clothing[];
    LongSleeve: Clothing;
  };
}

const brands:Brand[] = [
  {
    Hanes: {
      TShirt: { name: 'Hanes T-Shirt', unitPrice: 5, darkUnitPrice: 6, designElements: 1 },
      Crewneck: { name: 'Hanes Crewneck', unitPrice: 11, darkUnitPrice: 13, designElements: 1 },
      Hoodie: { name: 'Hanes Hoodie', unitPrice: 18, darkUnitPrice: 20, designElements: 1 },
      LongSleeve: { name: 'Hanes Long Sleeve', unitPrice: 9, darkUnitPrice: 11, designElements: 1 },
    },
  },
  {
    Gildan: {
      TShirt: { name: 'Gildan T-Shirt', unitPrice: 5.75, darkUnitPrice: 6.75, designElements: 1 },
      Crewneck: { name: 'Gildan Crewneck', unitPrice: 12.25, darkUnitPrice: 14.25, designElements: 1 },
      Hoodie: { name: 'Gildan Hoodie', unitPrice: 19.25, darkUnitPrice: 21.25, designElements: 1 },
      LongSleeve: { name: 'Gildan Long Sleeve', unitPrice: 10.25, darkUnitPrice: 12.25, designElements: 1 },
    },
  },
  {
    ComfortColors: {
      TShirt: { name: 'Comfort Colors T-Shirt', unitPrice: 7, darkUnitPrice: 8, designElements: 1 },
      Crewneck: { name: 'Comfort Colors Crewneck', unitPrice: 15, darkUnitPrice: 17, designElements: 1 },
      Hoodie: { name: 'Comfort Colors Hoodie', unitPrice: 22, darkUnitPrice: 24, designElements: 1 },
      LongSleeve: { name: 'Comfort Colors Long Sleeve', unitPrice: 12, darkUnitPrice: 14, designElements: 1 },
    },
  },
  {
    Independent: {
      TShirt: { name: 'Independent T-Shirt', unitPrice: 6.5, darkUnitPrice: 7.5, designElements: 1 },
      Crewneck: { name: 'Independent Crewneck', unitPrice: 13.5, darkUnitPrice: 15.5, designElements: 1 },
      Hoodie: [
        { name: 'Independent Midweight Hoodie', unitPrice: 20.5, darkUnitPrice: 22.5, designElements: 1 },
        { name: 'Independent Heavyweight Hoodie', unitPrice: 25, darkUnitPrice: 27, designElements: 1 },
        { name: 'Independent Heavyweight Zip-Up Hoodie', unitPrice: 30, darkUnitPrice: 32, designElements: 1 },
      ],
      LongSleeve: { name: 'Independent Long Sleeve', unitPrice: 11.5, darkUnitPrice: 13.5, designElements: 1 },
    },
  },
];

export default function Example() {
  const [selected, setSelected] = useState<Brand>(brands[0]);

  return (
    <div className="fixed top-16 w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{Object.keys(selected)[0]}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {brands.map((brand, brandIdx) => (
                <Listbox.Option
                  key={brandIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={brand}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {Object.keys(brand)[0]}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );  
}