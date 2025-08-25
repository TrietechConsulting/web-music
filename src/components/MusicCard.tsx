import { Entity } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface MusicCardProps extends Entity {}

const MusicCard: FC<MusicCardProps> = (props) => {
  return (
    <Link href={`/${props.id}`}>
      <Card className="pt-0 overflow-hidden">
        <Image src={props.imageUrl} alt={props.name} width={500} height={500} />
        <CardHeader>
          <CardTitle>{props.name}</CardTitle>
          {props.description && (
            <CardDescription>{props.description}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
};

export default MusicCard;
