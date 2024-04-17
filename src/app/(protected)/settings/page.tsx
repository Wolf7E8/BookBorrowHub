"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { settingsAction } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSucess } from "@/components/form-sucess";
import { FormError } from "@/components/form-error";
import { Bell, Contact, Lock, Mail, NotepadText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const user = useCurrentUser();

  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [sucess, setSucess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      description: user?.description || undefined,
      enabledNotifications: user?.enabledNotifications || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSucess("");
    startTransition(async () => {
      try {
        const result = await settingsAction({
          ...values,
        });
        if (result.sucess) {
          update();
          setSucess(result.sucess);
        }
        if (result.error) {
          setError(result.error);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    });
  };
  return (
    <Card className="w-3/4">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-x-2 pb-1">
                      <Contact className="w-5 h-5" />
                      <span className="text-lg">Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-x-2 pb-1">
                      <NotepadText className="w-5 h-5" />
                      <span className="text-lg">Bio</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enabledNotifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-x-2 pb-1">
                      <Bell className="w-5 h-5" />
                      <span className="text-lg">Notifications</span>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false ? (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-x-2 pb-1">
                          <Mail className="w-5 h-5" />
                          <span className="text-lg">Email</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="email" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-x-2 pb-1">
                          <Lock className="w-5 h-5" />
                          <span className="text-lg">Password</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-x-2 pb-1">
                          <Lock className="w-5 h-5" />
                          <span className="text-lg">New password</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : null}
            </div>
            <FormSucess message={sucess} />
            <FormError message={error} />
            <div className="w-full flex flex-row-reverse">
              <Button className="px-8" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
