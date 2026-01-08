import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Palette, Camera, Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";

export default function MidjourneyArticle() {
  const examples = [
    {
      before: "A realistic portrait of a woman.",
      after: "Hyper-realistic portrait of a woman, cinematic lighting, 8k resolution, shot on 85mm lens, f/1.8, soft bokeh, detailed skin texture, professional studio lighting, Rembrandt lighting style."
    },
    {
      before: "A mountain landscape.",
      after: "Breathtaking alpine mountain landscape at golden hour, wide angle lens, sharp focus, vibrant sunset colors, reflections in a crystal clear lake, national geographic style, highly detailed."
    },
    {
      before: "Cyberpunk city street.",
      after: "Cyberpunk city street at night, neon lights, rainy atmosphere, puddles reflecting city lights, blade runner aesthetic, volumetric fog, cinematic composition, ultra-detailed textures."
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">The Secret to High-Quality Midjourney Images</h1>
          <p className="text-xl text-muted-foreground">Transform simple words into stunning visual masterpieces.</p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Why Detail Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Midjourney is capable of producing photorealistic art, but it needs more than just a subject. To get professional results, you must provide descriptive details about <strong>lighting, camera settings, and artistic style</strong>.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              The Fix: Artistic Refinement with PromptFix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              PromptFix isn't just for text. It understands the vocabulary of art and photography. It converts your simple descriptions into detailed artistic prompts that Midjourney can execute with high fidelity.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight">Before vs After Examples</h3>
          <div className="grid gap-6">
            {examples.map((ex, i) => (
              <Card key={i} className="border-2 overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b">
                  <div className="p-4 bg-muted/30">
                    <span className="text-xs font-bold uppercase text-muted-foreground">Before</span>
                    <p className="mt-2 text-sm italic">"{ex.before}"</p>
                  </div>
                  <div className="p-4 bg-primary/5">
                    <span className="text-xs font-bold uppercase text-primary">After (PromptFix Optimized)</span>
                    <p className="mt-2 text-sm font-medium">"{ex.after}"</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
