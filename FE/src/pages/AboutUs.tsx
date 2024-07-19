import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Về chúng tôi - TAQ Store
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to TAQ Store, your number one source for all things [product,
          ie: shoes, electronics, etc.]. We're dedicated to giving you the very
          best of [product], with a focus on dependability, customer service and
          uniqueness.
        </p>
        <p className="text-gray-700 mb-4">
          Founded in [year] by [founder name], TAQ Store has come a long way
          from its beginnings in a [starting location, ie: home office, garage,
          etc.]. When [founder name] first started out, [his/her/their] passion
          for [brand message - ie: helping other parents be more eco-friendly,
          providing the best equipment for his fellow musicians] drove
          [him/her/them] to [do intense research, quit her day job], and gave
          [him/her/them] the impetus to turn hard work and inspiration into to a
          booming online store. We now serve customers all over [place - town,
          country, the world], and are thrilled to be a part of the [adjective,
          ie: quirky, eco-friendly, fair trade] wing of the [industry type, ie:
          fashion, baked goods, watches] industry.
        </p>
        <p className="text-gray-700 mb-4">
          We hope you enjoy our products as much as we enjoy offering them to
          you. If you have any questions or comments, please don't hesitate to
          contact us.
        </p>
        <p className="text-gray-700">Sincerely,</p>
        <p className="text-gray-700 font-bold">[Founder Name], Founder</p>
      </div>
    </div>
  );
};

export default AboutUs;
