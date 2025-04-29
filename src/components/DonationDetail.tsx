
import { useState } from "react";
import { X, MapPin, Phone, Calendar, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Donation } from "../types";

interface DonationDetailProps {
  donation: Donation;
  onClose: () => void;
  onDelete: (id: string, password: string) => void;
}

const DonationDetail = ({ donation, onClose, onDelete }: DonationDetailProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleDelete = () => {
    if (!password) {
      toast.error("Please enter the password");
      return;
    }
    onDelete(donation.id, password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="relative h-64 sm:h-80">
          <img 
            src={donation.image} 
            alt={donation.title} 
            className="w-full h-full object-cover" 
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold font-heading mb-3">{donation.title}</h2>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground mb-4">
                {donation.description}
              </p>

              {donation.expiry && (
                <div className="flex items-center text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>Best before: {formatDate(donation.expiry)}</span>
                </div>
              )}

              <div className="flex items-center text-sm mb-3">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>Pickup address: {donation.address}</span>
              </div>

              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>Contact: {donation.contactInfo}</span>
              </div>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <div className="flex justify-between items-center border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Posted on {formatDate(donation.createdAt)}
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn-secondary bg-red-50 text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Donation
              </button>
            </div>
          ) : (
            <div className="border-t pt-4 animate-fade-in">
              <h3 className="text-lg font-semibold mb-2">Delete Donation</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Please enter the password you created when posting this donation.
              </p>
              <div className="flex gap-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleDelete}
                  className="btn-secondary bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
