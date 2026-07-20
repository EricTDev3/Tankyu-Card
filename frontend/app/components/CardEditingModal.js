import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

export default function CardEditingModal({
  formData,
  setFormData,
  setEditClicked,
  selectedCard,
  getCardsList,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.patch(
      "/api/shoppingList/editCard",
      { ...formData, cardId: selectedCard.id },
      { withCredentials: true },
    );
    setEditClicked(false);
    getCardsList();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="border-2 border-indigo-600" shadow={false}>
        <Typography className="p-2" variant="h4" color="blue-gray">
          Edit Card Details
        </Typography>
        <form
          className="mt-8 mb-2 w-60 max-w-screen-lg sm:w-96 p-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="sm"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Card Set
            </Typography>
            <Input
              size="sm"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.cardSet}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cardSet: e.target.value,
                })
              }
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Market Price
            </Typography>
            <Input
              type="text"
              size="sm"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.marketPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  marketPrice: e.target.value,
                })
              }
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Button className="mt-6 bg-purple-500" type="submit">
              Submit Edits
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
