/* eslint-disable react/prop-types */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PaystackButton } from "react-paystack";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

const schema = z.object({
  name: z.string("Please input your name"),
  amount: z
    .number()
    .min(500, "Amount must be at least 500")
    .max(1000000, "Amount must not exceed 1,000,000"),
});

export default function PayWithPaystack({ onPaymentSuccess }) {
  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const publicKey = import.meta.env.VITE_PAYSTACK_SECRET_KEY || "";

  if (!publicKey) {
    toast.error("Please set your Paystack public key");
    return null;
  }

  const name = watch("name");
  const amount = watch("amount");

  const psConfig = {
    reference: `txn-${crypto.randomUUID()}`,
    email: "tilewaolatoye17@gmail.com",
    name,
    publicKey,
    amount: amount * 100,
    currency: "NGN",
    metadata: {
      // name,
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: name,
        },

        {
          display_name: "Amount",
          variable_name: "amount",
          value: amount,
        },
      ],
    },
    onSuccess: () => {
      toast.success("You just helped Olatilewa's life!");
      reset();
      onPaymentSuccess();
    },
    onClose: () => {
      toast.warning("Olatilewa needs your help!");
    },
    onError: () => {
      toast.error("Damn, life is against Olatilewa!");
    },
  };

  return (
    <Card className="py-3 px-5 shadow-xl space-y-5">
      <CardHeader>
        <h3 className="text-2xl font-bold text-gray-800">I use Paystack</h3>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-4 text-gray-600">
          <Input
            {...register("name")}
            name="name"
            placeholder="Please put your name"
            type="text"
            required
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <Input
            {...register("amount")}
            name="amount"
            placeholder="Please enter amount (NGN)"
            type="number"
            required
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}

          {name && amount !== undefined && (
            <PaystackButton
              {...psConfig}
              text="Pay Now"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
