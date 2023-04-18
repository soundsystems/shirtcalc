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
  qty: number;
  total: number;
}

interface FormInputs {
  qty1: number;
  qty2: number;
  qty3: number;
  qty4: number;
  qty5: number;
  qty6: number;
  qty7: number;
  qty8: number;
  qty9: number;
  qty10: number;
  designElements: number;
  screenFee: number;
}

const MSAShirtCalculator: React.FC = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormInputs>();
  const [output, setOutput] = useState<CalculatedItem[]>([]);
  const [lightShirtSelected, setLightShirtSelected] = useState<boolean>(true);
  const [screenFeeSubtotal, setScreenFeeSubtotal] = useState<number>(0);

  const validateNumber = (value: number) => {
    const regex = /^\d+$/;
    return (regex.test(value.toString()) && value >= 0) || "Please enter a number or zero";
  };

  const validateDesignElements = (value: number) => {
    return value > 0 || "Please enter a number greater than 0";
  };
  

  const calcShirts: SubmitHandler<FormInputs> = () => {
    const data = getValues();
    const items: Item[] = [
      { name: 'T-Shirt', unitPrice: 5, darkUnitPrice: 6, designElements: 1 },
      { name: 'Crewneck', unitPrice: 11, darkUnitPrice: 13, designElements: 1 },
      { name: 'Hoodie', unitPrice: 18, darkUnitPrice: 20, designElements: 1 },
      { name: 'Long Sleeve', unitPrice: 9, darkUnitPrice: 11, designElements: 1 },
    ];
  
    const quantities = [
      data.qty1 || 0,
      data.qty2 || 0,
      data.qty3 || 0,
      data.qty4 || 0,
    ];
  
    const screenFee = data.designElements ? data.designElements * 10 : 10;
  
    const calculatedOutput: CalculatedItem[] = items.map((item, index) => {
      const { unitPrice, darkUnitPrice, ...rest } = item;
      const shirtPrice = lightShirtSelected ? unitPrice : darkUnitPrice;
      const total = shirtPrice * quantities[index];
      return { ...rest, qty: quantities[index], total, unitPrice: shirtPrice, darkUnitPrice };
    }).filter(item => item.qty > 0);
  

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
    <body className='p-4'>
    <div className="flex flex-col items-center pt-8">
    <Image src="/logo.png" alt="MSA Logo" width={200} height={200} />
    </div>
    <main className='py-5'>
      <h1 className="flex justify-center text-2xl font-bold mb-4 pt-3"> Screen-Print Estimator </h1>
      <h3 className="text-lg text-center font-semibold mb-2">Garment Color:</h3>
<div className="flex space-x-4 items-center justify-center">
  <input type="radio" id="light" name="shirtColor" value="light" checked={lightShirtSelected} onChange={() => handleShirtSelection(true)} />
  <label htmlFor="light">Light</label>
  <input type="radio" id="dark" name="shirtColor" value="dark" checked={!lightShirtSelected} onChange={() => handleShirtSelection(false)} />
  <label htmlFor="dark">Dark <span className='italic'> [Requires a White-Ink Underbase] </span> </label>
</div>
      <hr className="mb-4" />
      <form onSubmit={handleSubmit(calcShirts)} className="space-y-4 flex flex-col items-center">
<label htmlFor="designElements">Number of Design Elements:</label>
<input {...register('designElements', { valueAsNumber: true, onChange:calcShirts, validate: validateDesignElements })} id="screenFee" placeholder="Amount" defaultValue="1" className={`border text-center border-gray-300 rounded-md p-2 ${errors.designElements && 'border-red-500'}`} type="number" pattern="\d*" inputMode="numeric" min={1}/>
{errors.designElements && <span className="text-red-500">{errors.designElements.message}</span>}

<label htmlFor="qty1">T-Shirt:</label>
<input {...register('qty1', { valueAsNumber: true, onChange: calcShirts, validate: validateNumber })} id="qty1" placeholder="Quantity" className={`border text-center border-gray-300 rounded-md p-2 ${errors.qty1 && 'border-red-500'}`} type="number" pattern="\d*" inputMode="numeric" min={0}/>
{errors.qty1 && <span className="text-red-500">{errors.qty1.message}</span>}

<label className='pl-2' htmlFor="qty2">Crewneck:</label>
<input {...register('qty2', { valueAsNumber: true, onChange: calcShirts, validate: validateNumber })} id="qty2" placeholder="Quantity" className={`border text-center border-gray-300 rounded-md p-2 ${errors.qty2 && 'border-red-500'}`} type="number" pattern="\d*" inputMode="numeric" min={0}/>
{errors.qty2 && <span className="text-red-500">{errors.qty2.message}</span>}

<label className='pl-2' htmlFor="qty3">Hoodie:</label>
<input {...register('qty3', { valueAsNumber: true, onChange: calcShirts, validate: validateNumber })} id="qty3" placeholder="Quantity" className={`border text-center border-gray-300 rounded-md p-2 ${errors.qty3 && 'border-red-500'}`} type="number" pattern="\d*" inputMode="numeric" min={0}/>
{errors.qty3 && <span className="text-red-500">{errors.qty3.message}</span>}

<label className='pl-2' htmlFor="qty4">Long Sleeve:</label>
<input {...register('qty4', { valueAsNumber: true, onChange: calcShirts, validate: validateNumber })} id="qty4" placeholder="Quantity" className={`border text-center border-gray-300 rounded-md p-2 ${errors.qty4 && 'border-red-500'}`} type="number" pattern="\d*" inputMode="numeric" min={0}/>
{errors.qty4 && <span className="text-red-500">{errors.qty4.message}</span>}
        <button type="submit" className="bg-blue-500 text-white ml-3 px-4 py-2 rounded-md">Calculate Quote</button>
      </form>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">SKU</th>
            <th className="px-4 py-2">Price Per Unit</th>
            <th className="px-4 py-2">Total SKU Price</th>
          </tr>
        </thead>
    <tbody className='p-4'>
        {output.map(({ unitPrice, ...rest }, index) => (
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
      <td className="border text-center px-4 py-2">{rest.qty}</td>
      <td className="border text-left px-4 py-2">{rest.name}</td>
      <td className="border text-center px-4 py-2">${unitPrice.toFixed(2)}</td>
      <td className="border text-center px-4 py-2">${rest.total.toFixed(2)}</td>
    </tr>
  ))}
          <tr className="bg-gray-100">
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  </tr>
  </tbody>
  <tfoot>
  {output.length > 0 &&
    <tr className="total-row">
      <td className="border px-4 py-2 font-bold" colSpan={3}>Screen Fee:</td>
      <td className="border px-4 py-2 font-bold">${screenFeeSubtotal}</td>
    </tr>
  }
    <tr className="total-row">
    <td className="border px-4 py-2 font-bold" colSpan={3}>Subtotal:</td>
<td className="border px-4 py-2 font-bold">${(output.reduce((acc, item) => acc + item.total, 0) + screenFeeSubtotal).toFixed(2)}</td>
    </tr>
  </tfoot>
      </table>
    </main>
    </body>
  );
};

export default MSAShirtCalculator;