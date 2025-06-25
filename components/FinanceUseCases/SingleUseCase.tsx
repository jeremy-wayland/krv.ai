import { UseCase } from "@/types/usecase";
import Image from "next/image";

const SingleUseCase = ({ review }: { review: UseCase }) => {
  const { name, designation, image, imageDark, content } = review;
  return (
    <div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {name}
          </h3>
          <p>{designation}</p>
        </div>
        <Image
          src={image}
          alt={name}
          width={60}
          height={50}
          className="dark:hidden"
        />
        <Image
          src={imageDark}
          alt={name}
          width={60}
          height={50}
          className="hidden dark:block"
        />
      </div>

      <p>{content}</p>
    </div>
  );
};

export default SingleUseCase;
