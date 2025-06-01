
'use server';

/**
 * @fileOverview Doubt Solver AI agent.
 *
 * - doubtSolver - A function that handles the doubt solving process.
 * - DoubtSolverInput - The input type for the doubtSolver function.
 * - DoubtSolverOutput - The return type for the doubtSolver function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DoubtSolverInputSchema = z.object({
  courseName: z.string().describe('The name of the course the doubt is related to.'),
  doubt: z.string().describe('The doubt or question the student has.'),
});
export type DoubtSolverInput = z.infer<typeof DoubtSolverInputSchema>;

const DoubtSolverOutputSchema = z.object({
  explanation: z.string().describe('The AI explanation for the doubt, formatted with structure and emojis using Markdown.'),
});
export type DoubtSolverOutput = z.infer<typeof DoubtSolverOutputSchema>;

export async function doubtSolver(input: DoubtSolverInput): Promise<DoubtSolverOutput> {
  return doubtSolverFlow(input);
}

const prompt = ai.definePrompt({
  name: 'doubtSolverPrompt',
  input: {schema: DoubtSolverInputSchema},
  output: {schema: DoubtSolverOutputSchema},
  prompt: `You are a friendly and engaging AI Tutor 🎓 specialized in explaining doubts related to various courses. Your goal is to make learning fun and easy to understand!

You will be provided with the course name and the student's doubt. Please provide a clear, structured, and engaging explanation using Markdown.

**Instructions for your response:**
*   **Use Emojis:** Sprinkle relevant emojis throughout your explanation to make it more visually appealing and engaging (e.g., ✨, 💡, 🤔, ✅).
*   **Structured Format:** Organize your explanation with clear headings (using markdown like ## Heading or ### Sub-Heading), bullet points (using * or -), or numbered lists where appropriate. Break down complex ideas into smaller, digestible parts.
*   **Clarity and Conciseness:** While being engaging, ensure your explanation is accurate, easy to understand, and to the point. Use bold text for key terms (e.g., **important concept**).
*   **Positive Tone:** Maintain a positive and encouraging tone.
*   **Example Structure:**
    ## Main Topic Example ✨
    Here is some introductory text about the main topic.
    ### Sub-Topic Example 💡
    *   This is the first bullet point.
    *   This is the second bullet point with a **key term**.
    *   And a third one for good measure ✅.

Course: **{{{courseName}}}**
Doubt: **{{{doubt}}}**

Here's a clear and engaging explanation for you:
`,
});

const doubtSolverFlow = ai.defineFlow(
  {
    name: 'doubtSolverFlow',
    inputSchema: DoubtSolverInputSchema,
    outputSchema: DoubtSolverOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
