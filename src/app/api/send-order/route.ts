import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, items, totalPrice } = body;

    // Log for debugging
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('Sending email to:', 'thommangor@gmail.com');

    const cartItems = items
      .map((item: any) => 
        `${item.name} (${item.set}) - ${item.quantity}x ${item.price} kr = ${item.quantity * item.price} kr`
      )
      .join('\n');

    const { data, error } = await resend.emails.send({
      from: 'PokéShop <onboarding@resend.dev>',
      to: ['thommangor@gmail.com'], // Ændr til din rigtige email!
      subject: `Ny Pokémon kort bestilling fra ${name}`,
      text: `
Ny bestilling modtaget!

KONTAKTINFORMATION:
Navn: ${name}
Email: ${email}
Telefon: ${phone || 'Ikke angivet'}

BESTILLING:
${cartItems}

TOTAL: ${totalPrice} kr

BESKED:
${message || 'Ingen besked'}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}