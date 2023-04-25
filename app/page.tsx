'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';

interface Item {
  name: string;
  unitPrice: number;
  darkUnitPrice: number;
  designElements: number;
}


interface CalculatedItem extends Item {
  gmt: number;
  total: number;
}

interface FormInputs {
  gmt1: number;
  gmt2: number;
  gmt3: number;
  gmt4: number;
  gmt5: number;
  gmt6: number;
  gmt7: number;
  gmt8: number;
  gmt9: number;
  gmt10: number;
  designElements: number;
  screenFee: number;
}

const MSAShirtCalculator: React.FC = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormInputs>();
  const [output, setOutput] = useState<CalculatedItem[]>([]);
  const [lightShirtSelected, setLightShirtSelected] = useState<boolean>(true);
  const [screenFeeSubtotal, setScreenFeeSubtotal] = useState<number>(0);
  const [tooltipOneVisible, setTooltipOneVisible] = useState(false); // NEW: State for tooltip visibility
  const [tooltipTwoVisible, setTooltipTwoVisible] = useState(false);
  const [tooltipThreeVisible, setTooltipThreeVisible] = useState(false);

  const validateNumber = (value: number) => {
    const regex = /^\d+$/;
    return (regex.test(value.toString()) && value >= 0);
  };

  const validateDesignElements = (value: number) => {
    return value > 0;
  };
  

  const calcShirts: SubmitHandler<FormInputs> = () => {
    const data = getValues();
    const items: Item[] = [
      { name: 'T-Shirt', unitPrice: 5, darkUnitPrice: 6, designElements: 1 },
      { name: 'Crewneck', unitPrice: 11, darkUnitPrice: 13, designElements: 1 },
      { name: 'Hoodie', unitPrice: 18, darkUnitPrice: 20, designElements: 1 },
      { name: 'Long Sleeve', unitPrice: 9, darkUnitPrice: 11, designElements: 1 },
    ];
  
    const garments = [
      data.gmt1 || 0,
      data.gmt2 || 0,
      data.gmt3 || 0,
      data.gmt4 || 0,
    ];
  
    const screenFee = data.designElements ? data.designElements * 10 : 10;
  
    const calculatedOutput: CalculatedItem[] = items.map((item, index) => {
      const { unitPrice, darkUnitPrice, ...rest } = item;
      const shirtPrice = lightShirtSelected ? unitPrice : darkUnitPrice;
      const total = shirtPrice * garments[index];
      return { ...rest, gmt: garments[index], total, unitPrice: shirtPrice, darkUnitPrice };
    }).filter(item => item.gmt > 0);
  

    setScreenFeeSubtotal(screenFee);
    setOutput(calculatedOutput);
  };

  const handleShirtSelection = (selected: boolean) => {
    if (selected !== lightShirtSelected) {
      setOutput([]);
      setLightShirtSelected(selected);
    }
  }

  return (
    <body className='p-4 dark:bg-slate-900'>
    <div className="flex flex-col items-center pt-8">
    <Image src="/logo.png" alt="MSA Logo" width={200} height={200} />
    </div>
    <main className='py-5'>
      <h1 className="flex justify-center text-2xl font-bold mb-4 pt-3 dark:text-white"> Screen-Print Estimator </h1>
      <h3 className="text-lg text-center font-semibold mb-2 dark:text-white">Garment Color:</h3>
{/* Select Light Colored Garment */}
      <div className="flex space-x-4 items-center justify-center">
  <input className="text-purple-500 focus:ring-0" type="radio" id="light" name="shirtColor" value="light" checked={lightShirtSelected} onChange={() => handleShirtSelection(true)} />
  <label className='dark:text-white' htmlFor="light">Light</label>
{/* Select Dark Colored Garment */}
  <div onMouseOver={() => setTooltipOneVisible(true)} onMouseOut={() => setTooltipOneVisible(false)} onTouchStart={() => setTooltipOneVisible(!tooltipOneVisible)}>
  <input className="text-purple-500 focus:ring-0" type="radio" id="dark" name="shirtColor" value="dark" checked={!lightShirtSelected} onChange={() => handleShirtSelection(false)} />
  <label htmlFor="dark" className="relative p-2 dark:text-white">Dark<span className= "p-1">&#8505;</span>
  </label>
  <span
    className={`italic absolute z-10 px-2 py-1 text-xs bg-gray-700 text-white rounded-md mt-1 ${tooltipOneVisible ? '' : 'hidden'}`}
  >
    Price reflects requirement of WHITE-INK UNDERBASE
  </span>
  </div>
</div>

      <hr className="mb-4" />
<form onSubmit={handleSubmit(calcShirts)} className="space-y-4 flex flex-col items-center lg:items-end lg:flex-row lg:justify-center">
  <div className="flex flex-col items-center" onMouseOver={() => setTooltipTwoVisible(true)} onMouseOut={() => setTooltipTwoVisible(false)} onTouchStart={() => setTooltipTwoVisible(!tooltipTwoVisible)}>
    <label htmlFor="designElements" className="lg:pr-4 dark:text-white"><span className= "p-1">&#8505;</span>Number of Design Elements:</label>
    <span
    className={`italic absolute z-10 px-2 py-1 text-xs bg-gray-700 text-white rounded-md mt-1 ${tooltipTwoVisible ? '' : 'hidden'}`}
  >
    The number of unique graphics on the garment <br/>
    Note: If the same graphic is used twice, then it is only counted as one element <br/>
    (ie. First graphic on Front Left Chest + Second Graphic on Full Back = 2 design elements)
  </span>
    <input {...register('designElements', { valueAsNumber: true, validate: validateDesignElements })} id="screenFee" placeholder="Amount" defaultValue="1" className={`focus:border-purple-500 border-2 text-center border-purple-200 rounded-md p-2 dark:bg-slate-600 dark:text-white ${errors.designElements && "border-red-500"} w-1/2`} type="number" pattern="\d*" inputMode="numeric" min={1}/>
    {errors.designElements && <span className="text-red-500">{errors.designElements.message}</span>}
  </div>

  <div className="flex flex-col items-center">
    <label className='dark:text-white' htmlFor="gmt1">T-Shirt:</label>
    <input {...register('gmt1', { valueAsNumber: true, validate: validateNumber })} id="gmt1" placeholder="Quantity" className={`focus:border-purple-500 border-2 text-center border-purple-200 rounded-md p-2 dark:bg-slate-600 dark:text-white ${errors.gmt1 && "border-red-500"} w-1/2`} type="number" pattern="\d*" inputMode="numeric" min={0}/>
    {errors.gmt1 && <span className="text-red-500">{errors.gmt1.message}</span>}
  </div>

  <div className="flex flex-col items-center">
    <label className='pl-2 dark:text-white'htmlFor="gmt2">Crewneck:</label>
    <input {...register('gmt2', { valueAsNumber: true, validate: validateNumber })} id="gmt2" placeholder="Quantity" className={`focus:border-purple-500 border-2 text-center border-purple-200 rounded-md p-2 dark:bg-slate-600 dark:text-white ${errors.gmt2 && "border-red-500"} w-1/2`} type="number" pattern="\d*" inputMode="numeric" min={0}/>
    {errors.gmt2 && <span className="text-red-500">{errors.gmt2.message}</span>}
  </div>

  <div className="flex flex-col items-center">
    <label className='pl-2 dark:text-white' htmlFor="gmt3">Hoodie:</label>
    <input {...register('gmt3', { valueAsNumber: true, validate: validateNumber })} id="gmt3" placeholder="Quantity" className={`focus:border-purple-500 border-2 text-center border-purple-200 rounded-md p-2 dark:bg-slate-600 dark:text-white ${errors.gmt3 && "border-red-500"} w-1/2`} type="number" pattern="\d*" inputMode="numeric" min={0}/>
    {errors.gmt3 && <span className="text-red-500">{errors.gmt3.message}</span>}
  </div>

  <div className="flex flex-col items-center">
    <label className='pl-2 dark:text-white' htmlFor="gmt4">Long Sleeve:</label>
    <input {...register('gmt4', { valueAsNumber: true, validate: validateNumber })} id="gmt4" placeholder="Quantity" className={`focus:border-purple-500 border-2 text-center border-purple-200 rounded-md p-2 dark:bg-slate-600 dark:text-white ${errors.gmt4 && "border-red-500"} w-1/2`} type="number" pattern="\d*" inputMode="numeric" min={0}/> 
    {errors.gmt4 && <span className="text-red-500">{errors.gmt4.message}</span>}
</div>

  <button type="submit" className="bg-purple-500 text-white ml-3 px-4 py-2 rounded-lg">Calculate Quote</button>
</form>

      <table className="table-auto w-full mt-8">
        <thead>
          <tr className="bg-gray-200 dark:bg-slate-700">
            <th className="px-4 py-2 dark:text-white">Quantity</th>
            <th className="px-4 py-2 dark:text-white">SKU</th>
            <th className="px-4 py-2 dark:text-white">Unit Price</th>
            <th className="px-4 py-2 dark:text-white">Total SKU</th>
          </tr>
        </thead>
    <tbody className='p-4 dark:text-white'>
        {output.map(({ unitPrice, ...rest }, index) => (
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-slate-600' : ''}>
      <td className="border text-center px-4 py-2">{rest.gmt}</td>
      <td className="border text-left px-4 py-2">{rest.name}</td>
      <td className="border text-center px-4 py-2">${unitPrice.toFixed(2)}</td>
      <td className="border text-center px-4 py-2">${rest.total.toFixed(2)}</td>
    </tr>
  ))}
  </tbody>
  <tfoot>
  <span
    className={`italic absolute z-10 px-2 py-1 text-xs bg-gray-700 text-white rounded-md mt-1 ${tooltipThreeVisible ? '' : 'hidden'}`}
  >
    Each design requires a ONE-TIME charge of $10 to burn the screen and keep it on hand.
  </span>
  {output.length > 0 &&
    <tr className="total-row">
      <td className="border px-4 py-2 font-bold text-right dark:text-white" colSpan={3}><span className= "p-1">&#8505;</span>Screen Fee:
  </td>
      <td className="border px-4 py-2 font-bold dark:text-white" onMouseOver={() => setTooltipThreeVisible(true)} onMouseOut={() => setTooltipThreeVisible(false)} onTouchStart={() => setTooltipThreeVisible(!tooltipThreeVisible)}>${screenFeeSubtotal}</td>
    </tr>
  }
    <tr className="total-row">
    <td className="border px-4 py-2 font-bold text-right dark:text-white" colSpan={3}>Subtotal:</td>
<td className="border px-4 py-2 font-bold dark:text-white">${(output.reduce((acc, item) => acc + item.total, 0) + screenFeeSubtotal).toFixed(2)}</td>
    </tr>
  </tfoot>
      </table>
    </main>
    </body>
  );
};

export default MSAShirtCalculator;