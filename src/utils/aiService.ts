
import { toast } from "sonner";

export interface Message {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
}

// Mock interior design images - in a real app, these would come from an AI image generation API
const mockDesignImages = [
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "https://plus.unsplash.com/premium_photo-1678402545080-a782f544a5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
];

// Mock response texts based on common design styles
const getDesignResponse = (query: string): string => {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("minimalist") || lowercaseQuery.includes("minimal")) {
    return "Here's a minimalist design concept based on your requirements. The space features clean lines, neutral colors, and open space. I've eliminated clutter and focused on functional furniture with simple geometric forms. The natural lighting complements the minimalist aesthetic, creating a sense of calm and order.";
  } 
  else if (lowercaseQuery.includes("scandinavian")) {
    return "This Scandinavian-inspired design embraces hygge principles with warm wood tones and natural textures. Note the light color palette, functional furniture, and cozy textiles. The wooden accents add warmth while maintaining the characteristic Scandinavian simplicity and connection to nature.";
  }
  else if (lowercaseQuery.includes("japanese") || lowercaseQuery.includes("zen")) {
    return "I've created this Japanese-inspired interior with principles of zen and minimalism. Notice the clean lines, natural materials, and balanced asymmetry. The space incorporates low furniture, tatami-inspired flooring textures, and a neutral color palette with subtle natural accents that create a peaceful, harmonious environment.";
  }
  else if (lowercaseQuery.includes("industrial")) {
    return "This industrial design concept features raw materials like exposed brick, metal fixtures, and reclaimed wood. I've incorporated open space with high ceilings, visible ducts, and large windows. The color palette includes grays, blacks, and warm woods to balance the industrial elements with comfort.";
  }
  else {
    return "Here's a design concept based on your requirements. I've focused on creating a balanced, harmonious space that fulfills your functional needs while maintaining aesthetic appeal. The color palette is coordinated to create visual interest while ensuring a cohesive look throughout the space.";
  }
};

// Simulate AI image generation
export const generateDesignImage = async (prompt: string): Promise<Message> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real app, this would call an AI image generation API
  // We're using mock images for demonstration
  const randomIndex = Math.floor(Math.random() * mockDesignImages.length);
  const randomImage = mockDesignImages[randomIndex];
  
  return {
    role: "assistant",
    content: getDesignResponse(prompt),
    imageUrl: randomImage
  };
};
