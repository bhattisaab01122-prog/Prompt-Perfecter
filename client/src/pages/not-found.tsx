import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg text-center" data-testid="card-404">
          <CardContent className="pt-8 pb-4">
            <div className="mb-6">
              <span className="text-8xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                404
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-3" data-testid="text-404-title">
              Page Not Found
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Search className="w-4 h-4" />
              <span>Looking for prompt optimization? Head to our homepage!</span>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pb-8">
            <Link href="/">
              <Button variant="default" className="gap-2" data-testid="button-go-home">
                <Home className="w-4 h-4" />
                Go to Homepage
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={() => window.history.back()}
              data-testid="button-go-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
