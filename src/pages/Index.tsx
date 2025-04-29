
import { useState, useEffect } from "react";
import { Plus, Search, MapPin, Utensils } from "lucide-react";
import { toast } from "sonner";
import DonationForm from "../components/DonationForm";
import DonationCard from "../components/DonationCard";
import DonationDetail from "../components/DonationDetail";
import { Donation } from "../types";

const Index = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  
  // Load donations from localStorage on component mount
  useEffect(() => {
    const savedDonations = localStorage.getItem("donations");
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }
  }, []);

  // Save donations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("donations", JSON.stringify(donations));
  }, [donations]);

  const handleAddDonation = (donation: Donation) => {
    setDonations([...donations, donation]);
    setShowDonationForm(false);
    toast.success("Food donation posted successfully!");
  };

  const handleDeleteDonation = (id: string, password: string) => {
    const donationToDelete = donations.find(d => d.id === id);
    
    if (!donationToDelete) {
      toast.error("Donation not found");
      return;
    }
    
    if (donationToDelete.password !== password) {
      toast.error("Incorrect password");
      return;
    }
    
    const updatedDonations = donations.filter(d => d.id !== id);
    setDonations(updatedDonations);
    setSelectedDonation(null);
    toast.success("Donation deleted successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/20 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto page-transition">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Share-A-Meal
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Share your surplus food with those who need it most
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowDonationForm(true)}
              className="btn-primary shadow-md fade-in"
            >
              <Plus className="mr-2 h-4 w-4" />
              Donate Food
            </button>
            <a href="#donations" className="btn-secondary fade-in">
              <Search className="mr-2 h-4 w-4" />
              Find Food
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center card-shadow fade-in">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Food</h3>
              <p className="text-muted-foreground">
                Have surplus food? Post details and a photo for people in need.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center card-shadow fade-in" style={{animationDelay: "0.1s"}}>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Location</h3>
              <p className="text-muted-foreground">
                Those in need can browse available food and find locations nearby.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center card-shadow fade-in" style={{animationDelay: "0.2s"}}>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Access</h3>
              <p className="text-muted-foreground">
                No sign-up required. Just post or browse food donations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donations Section */}
      <section id="donations" className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-heading">Available Food</h2>
            <button 
              onClick={() => setShowDonationForm(true)}
              className="btn-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Donate Food
            </button>
          </div>

          {donations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg card-shadow">
              <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Donations Yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to share food with those who need it.
              </p>
              <button 
                onClick={() => setShowDonationForm(true)}
                className="btn-primary"
              >
                Donate Food
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                  onClick={() => setSelectedDonation(donation)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm
          onClose={() => setShowDonationForm(false)}
          onSubmit={handleAddDonation}
        />
      )}

      {/* Donation Detail Modal */}
      {selectedDonation && (
        <DonationDetail
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onDelete={handleDeleteDonation}
        />
      )}
    </div>
  );
};

export default Index;
