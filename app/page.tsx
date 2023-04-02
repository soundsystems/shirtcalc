'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';

interface Item {
  name: string;
  unitPrice: number;
  darkUnitPrice: number;
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
  design1: number;
  design2: number;
  design3: number;
  design4: number;
  design5: number;
  design6: number;
  screenFee: number;
  colorChanges: number;
  wholesaleDiscount: number;
}

const MSAShirtCalculator: React.FC = () => {
  const { register, handleSubmit } = useForm<FormInputs>();
  const [output, setOutput] = useState<CalculatedItem[]>([]);
  const [lightShirtSelected, setLightShirtSelected] = useState<boolean>(true);

  const calcShirts: SubmitHandler<FormInputs> = (data) => {
    const items: Item[] = [
      { name: '100% Cotton T-Shirt', unitPrice: 16, darkUnitPrice: 18 },
      { name: '50/50 T-Shirt', unitPrice: 12, darkUnitPrice: 14 },
      { name: 'Sweatshirt', unitPrice: 20, darkUnitPrice: 22 },
      { name: 'Long Sleeve Shirt', unitPrice: 18, darkUnitPrice: 20 }
    ];

    const quantities = [
      data.qty1 ?? 0,
      data.qty2 ?? 0,
      data.qty3 ?? 0,
      data.qty4 ?? 0,
      data.qty5 ?? 0,
      data.qty6 ?? 0,
      data.qty7 ?? 0,
      data.qty8 ?? 0,
      data.qty9 ?? 0,
      data.qty10 ?? 0
    ];

    const designElements = [
      data.design1 ?? 0,
      data.design2 ?? 0,
      data.design3 ?? 0,
      data.design4 ?? 0,
      data.design5 ?? 0,
      data.design6 ?? 0,
    ];

    const screenFee = data.screenFee ?? 0;
    const colorChanges = data.colorChanges ?? 0;
    const wholesaleDiscount = data.wholesaleDiscount ?? 0;

    const calculatedOutput: CalculatedItem[] = items.map((item, index) => {
      const { unitPrice, darkUnitPrice, ...rest } = item;
      const shirtPrice = lightShirtSelected ? unitPrice : darkUnitPrice;
      const total = shirtPrice * quantities[index] +
        designElements.reduce((acc, cur) => acc + cur, 0) * (shirtPrice / 2) +
        screenFee +
        colorChanges * 10;
      const discountedTotal = total * (1 - wholesaleDiscount / 100);
      return { ...rest, qty: quantities[index], total: discountedTotal, unitPrice: shirtPrice, darkUnitPrice };
    });
    

    setOutput(calculatedOutput);
  };

  const handleShirtSelection = (selected: boolean) => {
    if (selected !== lightShirtSelected) {
      setOutput([]);
      setLightShirtSelected(selected);
    }
  }

  return (
    <>
    <div className="flex flex-col items-center pt-8">
    <Image src="/logo.png" alt="MSA Logo" width={200} height={200} />
    </div>
    <main className='px-10 py-5'>
      <h1 className="flex justify-center text-2xl font-bold mb-4"> MSA Simple Quote Calculator</h1>
      <h3 className="text-lg font-medium mb-2">Garment Color:</h3>
  <div className="flex space-x-4 items-center">
    <input type="radio" id="light" name="shirtColor" value="light" checked={lightShirtSelected} onChange={() => handleShirtSelection(true)} />
    <label htmlFor="light">Light</label>
    <input type="radio" id="dark" name="shirtColor" value="dark" checked={!lightShirtSelected} onChange={() => handleShirtSelection(false)} />
    <label htmlFor="dark">Dark [Requires a White-Ink Underbase] </label>
  </div>
      <hr className="mb-4" />
      <form onSubmit={handleSubmit(calcShirts)} className="space-y-4">
<label htmlFor="qty1">100% Cotton T-Shirt:</label>
<input {...register('qty1', { valueAsNumber: true })} id="qty1" placeholder="Quantity" className="border border-gray-300 rounded-md p-2"/>

<label className='pl-2' htmlFor="qty2">50/50 T-Shirt:</label>
<input {...register('qty2', { valueAsNumber: true })} id="qty2" placeholder="Quantity" className="border border-gray-300 rounded-md p-2"/>

<label className='pl-2' htmlFor="qty3">Sweatshirt:</label>
<input {...register('qty3', { valueAsNumber: true })} id="qty3" placeholder="Quantity" className="border border-gray-300 rounded-md p-2"/>

<label className='pl-2' htmlFor="qty4">Long Sleeve Shirt:</label>
<input {...register('qty4', { valueAsNumber: true })} id="qty4" placeholder="Quantity" className="border border-gray-300 rounded-md p-2"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Calculate</button>
      </form>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Unit Price</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {output.map(({ unitPrice, ...rest }, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{rest.qty}</td>
              <td className="border px-4 py-2">{rest.name}</td>
              <td className="border px-4 py-2">{unitPrice}</td>
              <td className="border px-4 py-2">{rest.total}</td>
            </tr>
          ))}
          <tr className="bg-gray-100">
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2 font-bold">Subtotal:</td>
  <td className="border px-4 py-2 font-bold">${output.reduce((acc, cur) => acc + cur.total, 0)}</td>
</tr>
        </tbody>
      </table>
    </main>
    </>
  );
};

export default MSAShirtCalculator;