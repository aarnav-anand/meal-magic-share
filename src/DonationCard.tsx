
import { MapPin, Clock } from "lucide-react";
import { Donation } from "./types";

interface DonationCardProps {
  donation: Donation;
  onClick: () => void;
}

const DonationCard = ({ donation, onClick }: DonationCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isNew = () => {
    const createdAt = new Date(donation.createdAt);
    const now = new Date();
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden card-shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in"
    >
      <div className="relative h-48">
        <img 
          src={donation.image} 
          alt={donation.title} 
          className="w-full h-full object-cover" 
        />
        {isNew() && (
          <div className="absolute top-3 right-3 bg-primary px-2 py-1 rounded-full text-white text-xs font-medium">
            New
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{donation.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {donation.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span className="line-clamp-1">{donation.address}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1 text-primary" />
          <span>Posted {formatDate(donation.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
