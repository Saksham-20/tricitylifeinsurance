import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { InterestType } from '@prisma/client';

const interestMap: Record<string, InterestType> = {
  'agent': InterestType.agent,
  'lic agent': InterestType.agent,
  'bima-sakhi': InterestType.bima_sakhi,
  'bima sakhi': InterestType.bima_sakhi,
  'development-officer': InterestType.development_officer,
  'development officer': InterestType.development_officer,
};

const LeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  qualification: z.string().min(1, 'Please select a qualification'),
  interest: z.enum(['agent', 'bima-sakhi', 'development-officer']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = LeadSchema.parse(body);
    
    // Map string interest to Prisma enum
    const interestType = interestMap[validatedData.interest.toLowerCase()] || InterestType.agent;
    
    // Insert into database
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        city: validatedData.city,
        qualification: validatedData.qualification,
        interest: interestType,
      },
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        leadId: lead.id 
      },
      { status: 201 }
    );
    
  } catch (error: unknown) {
    console.error('Error creating lead:', error);
    
    if (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      (error as { name?: string }).name === 'ZodError' &&
      'issues' in error
    ) {
      const zodIssues = (error as { issues?: Array<{ message?: string }> }).issues;
      return NextResponse.json(
        { error: zodIssues?.[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}
