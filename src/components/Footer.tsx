"use client";

import { IoLogoTwitter, IoMailUnread, IoLogoYoutube } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";

const SOCIAL_LINKS = {
  YOUTUBE: "https://www.youtube.com/channel/UCO-gfYYQL22oibzOjr1SnHA",
  TWITTER: "https://twitter.com/2ndTLMining",
  GITHUB: "https://github.com/2ndtlmining/Fluxnode",
  EMAIL: "2ndtlmining@gmail.com",
} as const;

const DONATION_ADDRESSES = {
  FLUX: "t1ebxupkNYVQiswfwi7xBTwwKtioJqwLmUG",
  BTC: "1MjMuVLEaAd8HJd3mh94L8qQe4cE6tH87V",
} as const;

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-opacity-5 hover:bg-opacity-10 transition-colors duration-200 text-emerald-500"
    >
      {icon}
    </a>
  </li>
);

const DonationAddress = ({
  label,
  address,
}: {
  label: string;
  address: string;
}) => (
  <li className="mb-2">
    <span className="font-medium text-gray-600 dark:text-gray-400">
      {label} Address:&nbsp;
    </span>
    <span className="text-gray-800 dark:text-gray-200 font-mono">
      {address}
    </span>
  </li>
);

export default function Footer() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0";
  const isDev = process.env.NODE_ENV === "development";
  const isTest = process.env.NEXT_PUBLIC_TEST_BUILD === "yes";

  const versionSuffix = isDev ? "-dev" : isTest ? "-test" : "";
  const displayVersion = `v${appVersion}${versionSuffix}`;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Links Section */}
            <div>
              <h2 className="text-xl font-medium mb-4">Follow Us</h2>
              <ul className="flex space-x-4">
                <SocialLink
                  href={SOCIAL_LINKS.TWITTER}
                  icon={<IoLogoTwitter size={20} />}
                />
                <SocialLink
                  href={SOCIAL_LINKS.YOUTUBE}
                  icon={<IoLogoYoutube size={20} />}
                />
                <SocialLink
                  href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                  icon={<IoMailUnread size={20} />}
                />
                <SocialLink
                  href={SOCIAL_LINKS.GITHUB}
                  icon={<BsGithub size={20} />}
                />
              </ul>
              <p className="mt-4 text-sm">
                <span className="text-emerald-400">
                  FluxNode {displayVersion}
                </span>
              </p>
            </div>

            {/* Donations Section */}
            <div>
              <h2 className="text-xl font-medium mb-4">Donations</h2>
              <p className="text-gray-400 mb-4">
                Donations are very much appreciated. Please consider donating to
                keep the website development going.
              </p>
              <ul className="list-none ml-4">
                <DonationAddress
                  label="Flux"
                  address={DONATION_ADDRESSES.FLUX}
                />
                <DonationAddress label="BTC" address={DONATION_ADDRESSES.BTC} />
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
