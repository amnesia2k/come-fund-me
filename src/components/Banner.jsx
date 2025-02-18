import { useState } from "react";
import Confetti from "react-confetti";
import { X, Copy, CreditCard, User, PiggyBank } from "lucide-react";
import PayWithPaystack from "./paywithpaystack";
import { toast } from "sonner";

export default function HeroSection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const moveNoButton = () => {
    const randomTop = Math.random() * 80 + 10; // Random top position (10% to 90%)
    const randomLeft = Math.random() * 80 + 10; // Random left position (10% to 90%)
    setNoButtonPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const handleYesClick = () => {
    setModalVisible(true);
  };
  // const copyToClipboard = (text) => {
  //   navigator.clipboard.writeText(text);
  // };
  const handleCheckClick = () => {
    setModalVisible(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    toast.success("Thank you very much!");
  };

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-900/30 to-black">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={["#a855f7", "#7e22ce"]}
        />
      )}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Send <span className="text-purple-400">Funds</span>
          </h1>
          <div className="flex gap-2 justify-center items-center">
            <button
              className={`bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg transition-colors ${
                noButtonPosition ? "absolute" : "relative"
              }`}
              style={noButtonPosition || {}}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              No
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg transition-colors"
              onClick={handleYesClick}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-purple-600 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple-500" />
              Please Send Me Money
            </h2>

            <div>
              <PayWithPaystack
                onPaymentSuccess={() => setPaymentSuccess(true)}
              />
            </div>
            {/* <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-700">Account Number:</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">9163169949</span>
                  <button
                    className="text-purple-600 hover:text-purple-700"
                    onClick={() => copyToClipboard("9163169949")}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-700">Bank Name:</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Opay</span>
                  <button
                    className="text-purple-600 hover:text-purple-700"
                    onClick={() => copyToClipboard("Opay")}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                  <User className="w-5 h-5 text-gray-500" />

                  <span className="font-medium">Robinson Honour</span>
                  <button
                    className="text-purple-600 hover:text-purple-700"
                    onClick={() => copyToClipboard("Robinson Honour")}
                  ></button>
                </div>
              </div>
            </div> */}
            {paymentSuccess && (
              <button
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors w-full"
                onClick={handleCheckClick}
              >
                Sent
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
