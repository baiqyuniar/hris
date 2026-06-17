"use client";

import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { authApi } from "../../lib/api";

export function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => router.push("/login"),
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start gap-2"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      <LogOut className="h-4 w-4" />
      Keluar
    </Button>
  );
}
