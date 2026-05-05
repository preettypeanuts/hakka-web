import Image from "next/image";

type Step = {
    title: string;
    description: string;
    image: string;
};

type Props = {
    title: string;
    steps: Step[];
};

export const WorkflowSection = ({ title, steps }: Props) => {
    return (
        <section className="py-20 bg-white">
            <div className="margin">

                {/* Title */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
                        {title}
                    </h2>
                </div>

                <div className="relative space-y-20">

                    {/* vertical line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2" />

                    {steps.map((step, i) => {
                        const isLeft = i % 2 === 0;

                        return (
                            <div
                                key={i}
                                className={`relative grid md:grid-cols-2 gap-10 items-center`}
                            >
                                {/* LEFT */}
                                <div className={`${isLeft ? "md:order-1" : "md:order-2"}`}>
                                    <div className="relative w-full h-65 rounded-2xl overflow-hidden shadow-sm">
                                        <Image
                                            src={`${step.image}?auto=format&fit=crop&w=800&q=80`}
                                            alt={step.title}
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className={`${isLeft ? "md:order-2" : "md:order-1"}`}>
                                    <div className="relative bg-neutral-50 border border-neutral-200 rounded-2xl p-6">

                                        {/* step number */}
                                        <div className="absolute -top-5 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-mainColor text-white text-sm font-semibold shadow">
                                            {i + 1}
                                        </div>

                                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* center dot */}
                                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mainColor border-4 border-white shadow" />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};